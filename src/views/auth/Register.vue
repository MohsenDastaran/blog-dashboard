<template>
	<Form
		class="form"
		v-slot="$form"
		:initialValues
		:resolver
		@submit="onFormSubmit"
	>
		<div class="input-wrapper">
			<label :class="{ 'label-error': $form.username?.invalid }" for="username"
				>User</label
			>
			<InputText
				pt:root:class="pt-input"
				id="username"
				name="username"
				type="text"
				fluid
			/>
			<Message
				v-if="$form.username?.invalid"
				severity="error"
				size="small"
				variant="simple"
				>{{ $form.username.error.message }}</Message
			>
		</div>

		<div class="input-wrapper">
			<label :class="{ 'label-error': $form.email?.invalid }" for="email"
				>Email</label
			>
			<InputText pt:root:class="pt-input" name="email" type="text" fluid />
			<Message
				v-if="$form.email?.invalid"
				severity="error"
				size="small"
				variant="simple"
				>{{ $form.email.error?.message }}</Message
			>
		</div>
		<div class="input-wrapper">
			<label :class="{ 'label-error': $form.password?.invalid }" for="password"
				>Password</label
			>
			<Password
				pt:root:class="pt-input"
				id="password"
				name="password"
				:feedback="false"
				:toggleMask="Boolean(password)"
				fluid
				v-model="password"
			/>
			<Message
				v-if="$form.password?.invalid"
				severity="error"
				size="small"
				variant="simple"
			>
				{{ $form.password.error?.message }}
			</Message>
		</div>
		<Button
			pt:root:class="pt-button"
			type="submit"
			severity="info"
			fluid
			label="Register"
		/>
	</Form>
	Already Registered?
	<strong style="cursor: pointer" @click="router.push('/login')">Login</strong>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { useToast } from "primevue/usetoast";
import { useAuthStore, IntUserRequest } from "@/store/auth";
import { objectMap } from "@/utils/objectMap";
import { useRouter } from "vue-router";

const router = useRouter();

const toast = useToast();

const password = ref("");
const initialValues: Ref<IntUserRequest> = ref({
	username: "",
	email: "",
	password: "",
});

const resolver = zodResolver(
	z.object({
		// comment to remove validation for username & email
		username: z.string().min(1, { message: "Username is required." }),
		email: z
			.string()
			.min(1, { message: "Email is required." })
			.email({ message: "Invalid email address." }),
		password: z.string().min(1, { message: "Required field" }),

		// uncomment in case of more rules

		// .max(8, { message: "Maximum 8 characters." })
		// .refine((value) => /[a-z]/.test(value), {
		// 	message: "Must have a lowercase letter.",
		// })
		// .refine((value) => /[A-Z]/.test(value), {
		// 	message: "Must have an uppercase letter.",
		// })
		// .refine((value) => /d/.test(value), {
		// 	message: "Must have a number.",
		// }),
	})
);

const onFormSubmit = (e) => {
	if (e.valid) {
		useAuthStore()
			.registerUser(e.values)
			.then((res) => {
				toast.add({
					severity: "success",
					summary: "Success",
					detail: `User ${res?.user?.username || ""} created`,
					life: 3000,
				});
				router.push("/");
			})
			.catch((error) => {
				console.error("onFormSubmit", { error });

				objectMap(error, (value, key) => {
					toast.add({
						severity: "error",
						summary: key,
						detail: value[0],
						life: 3000,
					});
				});
			});
	}
};
</script>
<style>
.input-wrapper {
	margin-bottom: 20px;
}
.label-error {
	color: var(--p-message-error-simple-color);
}
Form.form > Button {
	margin: 20px 0 10px 0;
	border: solid 1px var(--water-blue);
	background-color: var(--water-blue);
}
</style>
