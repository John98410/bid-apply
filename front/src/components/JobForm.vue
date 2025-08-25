<template>
  <form class="card" @submit.prevent="onSubmit">
    <h2>Applicant</h2>
    <div class="grid">
      <div class="field">
        <label for="name">Full Name</label>
        <input
          id="name"
          v-model.trim="form.name"
          type="text"
          placeholder="Jane Doe"
          :disabled="loading"
        />
        <small v-if="errors.name" class="err">{{ errors.name }}</small>
      </div>
      <div class="field">
        <label for="email">Email</label>
        <input
          id="email"
          v-model.trim="form.email"
          type="email"
          placeholder="jane@example.com"
          :disabled="loading"
        />
        <small v-if="errors.email" class="err">{{ errors.email }}</small>
      </div>
      <div class="field">
        <label for="phone">Phone</label>
        <input
          id="phone"
          v-model.trim="form.phone"
          type="tel"
          placeholder="+1 555 123 4567"
          :disabled="loading"
        />
        <small v-if="errors.phone" class="err">{{ errors.phone }}</small>
      </div>
    </div>

    <div class="field">
      <label for="address">Address</label>
      <input
        id="address"
        v-model.trim="form.address"
        type="text"
        placeholder="123 Main St, City, ST 12345"
        :disabled="loading"
      />
    </div>

    <h2>Education</h2>
    <div class="field">
      <label for="education">Education</label>
      <textarea
        id="education"
        v-model.trim="form.education"
        rows="3"
        placeholder="Enter education details"
        :disabled="loading"
      ></textarea>
    </div>

    <h2>Experience</h2>
    <div class="field">
      <label for="experience">Experience</label>
      <textarea
        id="experience"
        v-model.trim="form.experience"
        rows="4"
        placeholder="Enter work experience"
        :disabled="loading"
      ></textarea>
    </div>

    <h2>Job</h2>
    <div class="field">
      <label for="title">Job Title</label>
      <input
        id="title"
        v-model.trim="form.title"
        type="text"
        placeholder="Frontend Engineer"
        :disabled="loading"
      />
      <small v-if="errors.title" class="err">{{ errors.title }}</small>
    </div>

    <div class="field">
      <label for="description">Job Description</label>
      <textarea
        id="description"
        v-model.trim="form.description"
        rows="6"
        placeholder="Paste the JD here..."
        :disabled="loading"
      ></textarea>
      <small v-if="errors.description" class="err">{{ errors.description }}</small>
    </div>

    <div class="field">
      <label for="note">Notes</label>
      <input
        id="note"
        v-model.trim="form.note"
        type="text"
        placeholder="Any extra note"
        :disabled="loading"
      />
      <small v-if="errors.note" class="err">{{ errors.note }}</small>
    </div>

    <div class="row">
      <button type="submit" :disabled="loading">
        {{ loading ? "Submitting…" : "Submit" }}
      </button>
      <button type="button" class="ghost" @click="reset" :disabled="loading">
        Reset
      </button>
    </div>

    <p v-if="server.success" class="ok">✅ {{ server.message }}</p>
    <p v-if="server.error" class="err">❌ {{ server.error }}</p>
  </form>
</template>
<script setup>
import { reactive, ref } from "vue";
import { postJSON } from "../lib/api";

const blank = () => ({
  name: "",
  email: "",
  phone: "",
  address: "",
  education: "",
  experience: "",
  title: "",
  description: "",
  note: "",
});

const form = reactive(blank());
const errors = reactive({
  name: "",
  email: "",
  phone: "",
  title: "",
  description: "",
  note: "",
});
const loading = ref(false);
const server = reactive({ success: false, message: "", error: "" });

function validateEmail(v) {
  return typeof v === "string" && v.includes("@") && v.includes(".");
}
function validatePhone(v) {
  if (!v) return true;
  return v.replace(/[^0-9]/g, "").length >= 7;
}

function validate() {
  errors.name = form.name ? "" : "Name is required.";
  errors.email = form.email
    ? validateEmail(form.email)
      ? ""
      : "Enter a valid email."
    : "Email is required.";
  errors.title = form.title ? "" : "Job title is required.";
  errors.description = form.description ? "" : "Job description is required.";
  errors.note = "";
  return (
    !errors.name && !errors.email && !errors.phone && !errors.title && !errors.description
  );
}

function reset() {
  form.title = "";
  form.description = "";
  server.success = false;
  server.message = "";
  server.error = "";
}

async function onSubmit() {
  if (!validate()) return;
  loading.value = true;
  server.success = false;
  server.error = "";
  try {
    const payload = {
      applicant: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        education: form.education,
        experience: form.experience,
      },
      job: { title: form.title, description: form.description },
      note: form.note,
    };
    const res = await postJSON("/api/jobs", payload);
    server.success = true;
    server.message = res?.message || "Submitted successfully.";
    reset();
  } catch (e) {
    server.error = e?.message || "Submission failed.";
  } finally {
    loading.value = false;
  }
}
</script>
<style scoped>
.card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.field {
  margin-bottom: 1rem;
}
label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.35rem;
}
input,
textarea {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0.6rem 0.75rem;
  outline: none;
}
input:focus,
textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
small.err {
  color: #b91c1c;
}
.row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
button {
  border: none;
  border-radius: 999px;
  padding: 0.6rem 1rem;
  cursor: pointer;
  background: #111827;
  color: white;
}
button.ghost {
  background: transparent;
  color: #111827;
  border: 1px solid #111827;
}
.ok {
  color: #166534;
  margin-top: 0.75rem;
}
.err {
  color: #b91c1c;
  margin-top: 0.75rem;
}

h2 {
  margin: 1rem 0 0.5rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}
</style>
