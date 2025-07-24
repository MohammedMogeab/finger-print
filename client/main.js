import { startAuthentication, startRegistration } from "@simplewebauthn/browser"

const signupButton = document.querySelector("[data-signup]")
const loginButton = document.querySelector("[data-login]")
const emailInput = document.querySelector("[data-email]")
const modal = document.querySelector("[data-modal]")
const closeButton = document.querySelector("[data-close]")

signupButton.addEventListener("click", signup)
loginButton.addEventListener("click", login)
closeButton.addEventListener("click", () => modal.close())

const SERVER_URL = "https://finger-print-jfes.onrender.com"

async function signup() {
  const email = emailInput.value

  // Show loading overlay
  showLoadingOverlay("Creating account...")

  try {
    // 1. Get challenge from server
    const initResponse = await fetch(
      `${SERVER_URL}/init-register?email=${email}`,
      { credentials: "include" }
    )
    const options = await initResponse.json()
    if (!initResponse.ok) {
      showModalText(options.error || "Failed to initialize registration.")
      return // Exit if initialization fails
    }

    // 2. Create passkey
    const registrationJSON = await startRegistration(options)

    // 3. Save passkey in DB
    const verifyResponse = await fetch(`${SERVER_URL}/verify-register`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationJSON),
    })

    const verifyData = await verifyResponse.json()
    if (!verifyResponse.ok) {
      showModalText(verifyData.error || "Failed to verify registration.")
      return // Exit if verification fails
    }

    if (verifyData.verified) {
      showModalText(`Successfully registered ${email}`)
    } else {
      showModalText(`Failed to register.`)
    }
  } catch (error) {
    console.error("Signup error:", error)
    showModalText(`An error occurred during signup: ${error.message}`)
  } finally {
    hideLoadingOverlay()
  }
}

async function login() {
  const email = emailInput.value

  // Show loading overlay
  showLoadingOverlay("Authenticating...")

  try {
    // 1. Get challenge from server
    const initResponse = await fetch(`${SERVER_URL}/init-auth?email=${email}`, {
      credentials: "include",
    })
    const options = await initResponse.json()
    if (!initResponse.ok) {
      showModalText(options.error || "Failed to initialize authentication.")
      return // Exit if initialization fails
    }

    // 2. Get passkey
    const authJSON = await startAuthentication(options)

    // 3. Verify passkey with DB
    const verifyResponse = await fetch(`${SERVER_URL}/verify-auth`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authJSON),
    })

    const verifyData = await verifyResponse.json()
    if (!verifyResponse.ok) {
      showModalText(verifyData.error || "Failed to verify authentication.")
      return // Exit if verification fails
    }

    if (verifyData.verified) {
      sessionStorage.setItem("auth", "true")
      // *** THE CRITICAL CORRECTION: Changed from "services.html" to "/service.html" ***
      window.location.href = "/service.html" 
    } else {
      showModalText(`Failed to log in.`)
    }
  } catch (error) {
    console.error("Login error:", error)
    showModalText(`An error occurred during login: ${error.message}`)
  } finally {
    hideLoadingOverlay()
  }
}

function showModalText(text) {
  modal.querySelector("[data-content]").innerText = text
  modal.showModal()
}

// Function to show loading overlay (ensure this is in your index.html)
function showLoadingOverlay(message = "Processing...") {
  const loadingOverlay = document.getElementById("loadingOverlay")
  if (loadingOverlay) {
    loadingOverlay.querySelector("p").innerText = message
    loadingOverlay.classList.add("active")
  }
}

// Function to hide loading overlay (ensure this is in your index.html)
function hideLoadingOverlay() {
  const loadingOverlay = document.getElementById("loadingOverlay")
  if (loadingOverlay) {
    loadingOverlay.classList.remove("active")
  }
}