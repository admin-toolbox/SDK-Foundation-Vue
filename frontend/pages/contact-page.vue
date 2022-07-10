<template>
  <div v-if="error" class="grid-container">
    <p>{{ error }}</p>
  </div>

  <div v-if="msg" class="grid-container">
    <p>{{ msg }}</p>
  </div>

  <div class="grid-container">
    <div class="grid-x grid-margin-x">
      <div class="large-12 small-12 cell">
        <h5>Contact Us</h5>
      </div>
      <form
        class="large-12 small-12 cell"
        id="contact-form"
        @submit.prevent="onSubmit"
      >
        <input type="text" name="name" placeholder="Full name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="text" name="phone" placeholder="Phone Number" />
        <textarea
          name="message"
          rows="6"
          placeholder="Type your message here"
        ></textarea>
        <button
          id="submitBtn"
          class="g-recaptcha button"
          :is-loading="isLoading"
          :disabled="isLoading"
          data-sitekey=""
          data-callback="onSubmit"
        >
          <span>Send email</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const error = ref(null);
    const msg = ref(null);

    return {
      // Make this variables/objects available the above template.
      // Button spinner
      isLoading: false,
      status: false,
      msg,
      error,
    };
  },
  methods: {
    onSubmit() {
      // Called when form is submitted
      this.isLoading = true;
      this.status = false;
      this.msg = null;

      const form = document.getElementById("contact-form");
      const formData = new FormData(form);

      // Disable the submit button to prevent repeated clicks
      document.getElementById("submitBtn").disabled = true;

      // If name, email, phone, and message are empty, don't send the form
      if (
        formData.get("name") == "" ||
        formData.get("email") == "" ||
        formData.get("phone") == "" ||
        formData.get("message") == ""
      ) {
        this.isLoading = false;
        this.status = true;
        this.error = "Please fill out all fields.";
        return;
      }

      // TODO: Check if email is valid.
      // if ( !this.validateEmail(formData.get('email')) ) {
      //     this.isLoading = false;
      //     this.status = true;
      //     this.error = "Please enter a valid email address.";
      //     return;
      // }

      // Add Google reCAPTCHA token to form data
      //TODO: Integreate Google reCAPTCHA
      // formData.append('g-recaptcha-response', grecaptcha.getResponse());

      // Send form data to API route specified in backend/config.ini.
      fetch("/api/contact/send", {
        method: "post",
        body: formData,
      })
        .then((response) => {
          // a non-200 response code
          if (!response.ok) {
            // create error instance with HTTP status text
            const error = new Error(response.statusText);
            error.json = response.json();
            throw error;
          }
          return response.json();
        })
        .then((json) => {
          this.isLoading = false;
          this.status = true;
          if (json.success == true) {
            // Clear form
            form.reset();
            this.msg = "Thanks! Your message has been sent!";
            setTimeout(() => {
              document.getElementById("submitBtn").disabled = true;
            }, 15000);
          } else {
            document.getElementById("submitBtn").disabled = false;
            this.msg =
              "There was an error sending your message. Please try again.";
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.status = true;

          console.log(error);
        });
    },
  },
};
</script>
