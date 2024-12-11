<script setup>
import { ref, watch, computed } from "vue";
import { useUsersStore } from "/src/stores/usersStore";

const props = defineProps({
  isActive: Boolean,
  item: {
    type: Object,
    default: () => ({
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    }),
  },
});
const userData = computed({
  get() {
    return {
      id: props.item.id,
      name: props.item.name,
      lastName: props.item.lastName,
      email: props.item.email,
      phoneNumber: props.item.phoneNumber,
    };
  },
  set(value) {
    emit("update:item", value); // ส่งค่ากลับไปยัง component แม่
  },
});

const editUser = ref({
    id: 0,
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
});
const users = useUsersStore();
const isActive = ref(false);
const form = ref();
// const showphoneNumber = ref(false);

const emits = defineEmits(["update:isActive", "update:item"]);

const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

const updateUser = async () => {
  const { valid } = await form.value.validate();

  if (!valid) {
    return;
  }

  isActive.value = false;

  emits("update:isActive", false);
  emits("update:item", {
    ...userData.value,
    index: users.users.indexOf(props.item),
  });
};

watch(
  () => props.isActive,
  (value) => {
    editUser.value = props.item;
  }
);
</script>

<template>
  <div class="text-center pa-4">
    <v-dialog v-model="props.isActive" max-width="400" persistent>
      <v-card>
        <v-card-title class="d-flex text-center align-center justify-center ma-2">
            <v-icon size="28" class="me-2">mdi-account-edit</v-icon><p>EDIT USER </p>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="form" validate-on="submit lazy">
            <v-text-field
              v-model="editUser.name"
              label="Name"
              prepend-icon="mdi-account"
            ></v-text-field>
            <v-text-field
              v-model="editUser.lastName"
              label="Last Name"
              prepend-icon="mdi-account"
            ></v-text-field>
            <v-text-field
              v-model="editUser.phoneNumber"
              label="phoneNumber"
              prepend-icon="mdi-phone"
              :rules="[
                (v) => !!v || 'Phone number is required',
                (v) => /^[0-9]{10}$/.test(v) || 'Phone number must be valid',
              ]"
            ></v-text-field>
            <v-text-field
              v-model="editUser.email"
              label="Email"
              prepend-icon="mdi-email"
              :rules="emailRules"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn @click="emits('update:isActive', false)" color="error">
            Cancel
          </v-btn>

          <v-btn @click="updateUser" color="success"> Confirm </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
