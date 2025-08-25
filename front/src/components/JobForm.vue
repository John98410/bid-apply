<template>
    <form class="card" @submit.prevent="onSubmit">
        <div class="field">
            <label for="title">Job Title</label>
            <input id="title" v-model.trim="form.title" type="text" placeholder="e.g., Frontend Engineer"
                :disabled="loading" />
            <small v-if="errors.title" class="err">{{ errors.title }}</small>
        </div>


        <div class="field">
            <label for="description">Job Description</label>
            <textarea id="description" v-model.trim="form.description" rows="6" placeholder="Paste the JD here..."
                :disabled="loading"></textarea>
            <small v-if="errors.description" class="err">{{ errors.description }}</small>
        </div>


        <div class="field">
            <label for="note">Notes</label>
            <textarea id="note" v-model.trim="form.note" type="text" rows="6"
                placeholder="Any extra note for customizing resume" :disabled="loading" />
            <small v-if="errors.note" class="err">{{ errors.note }}</small>
        </div>


        <div class="row">
            <button type="submit" :disabled="loading">{{ loading ? 'Submitting…' : 'Submit' }}</button>
            <button type="button" class="ghost" @click="reset" :disabled="loading">Reset</button>
        </div>


        <p v-if="server.success" class="ok">✅ {{ server.message }}</p>
        <p v-if="server.error" class="err">❌ {{ server.error }}</p>
    </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { postJSON } from '../lib/api'


const form = reactive({
    title: '',
    description: '',
    note: ''
})


const errors = reactive({ title: '', description: '', note: '' })
const loading = ref(false)
const server = reactive({ success: false, message: '', error: '' })


function validate() {
    errors.title = form.title ? '' : 'Job title is required.'
    errors.description = form.description ? '' : 'Job description is required.'
    // "note" is optional; make it required if you prefer:
    errors.note = ''
    return !errors.title && !errors.description && !errors.note
}


function reset() {
    form.title = ''
    form.description = ''
    form.note = ''
    server.success = false
    server.message = ''
    server.error = ''
}


async function onSubmit() {
    if (!validate()) return
    loading.value = true
    server.success = false
    server.error = ''
    try {
        const payload = {
            jobTitle: form.title,
            jobDescription: form.description,
            note: form.note
        }
        // Adjust URL to your backend route
        const res = await postJSON('/api/autogen/answer', payload)
        server.success = true
        server.message = res?.message || 'Submitted successfully.'
        reset()
    } catch (e) {
        server.error = e?.message || 'Submission failed.'
    } finally {
        loading.value = false
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
</style>
