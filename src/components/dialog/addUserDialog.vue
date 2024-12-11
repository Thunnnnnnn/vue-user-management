<script setup>
import { ref } from "vue";
import { useUsersStore } from "/src/stores/usersStore";

const name = ref("");
const lastName = ref("");
const email = ref("");
const phoneNumber = ref("");
const users = useUsersStore();
const isActive = ref(false);
const form = ref();

const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const saveUser = async () => {
  const { valid } = await form.value.validate();

  if (!valid) {
    return;
  }

  users.addUser({
    name: name.value,
    lastName: lastName.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
  });

  name.value = "";
  lastName.value = "";
  email.value = "";
  phoneNumber.value = "";

  isActive.value = false;
};
</script>

<template>
  <div class="text-center pa-4">
    <v-dialog v-model="isActive" max-width="400" persistent>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn v-bind="activatorProps" color="primary"> Add User </v-btn>
      </template>

      <v-card>
        <v-card-title class="d-flex text-center align-center justify-center ma-2">
            <v-icon size="28" class="me-2">mdi-account-plus</v-icon><p>ADD USER </p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" validate-on="submit lazy">
            <v-text-field
              v-model="name"
              label="First name"
              prepend-icon="mdi-account"
              :rules="[(v) => !!v || 'Name is required']"
            ></v-text-field>
            <v-text-field
              v-model="lastName"
              label="Last Name"
              prepend-icon="mdi-account"
              :rules="[(v) => !!v || 'Last Name is required']"
            ></v-text-field>
            <v-text-field
              v-model="phoneNumber"
              label="Phone number(Ex: 0991991999)"
              prepend-icon="mdi-phone"
            
              :rules="[(v) => !!v || 'Phone number is required', (v) => /^[0-9]{10}$/.test(v) || 'Phone number must be valid']"
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              prepend-icon="mdi-email"
              :rules="emailRules"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn @click="isActive = false" color="error"> Cancel </v-btn>

          <v-btn @click="saveUser" color="success"> Confirm </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
