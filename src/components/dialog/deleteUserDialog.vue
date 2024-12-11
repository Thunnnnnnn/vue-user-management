<script setup>
import { useUsersStore } from "/src/stores/usersStore";

const users = useUsersStore();

const props = defineProps({
  isActive: Boolean,
  item: {
    type: Object,
    default: () => ({
      id: "",
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    }),
  },
});

const emits = defineEmits(["update:isActive", "delete:item"]);

const deleteUser = () => {
    // console.log(users.users.indexOf(props.item));
  emits("update:isActive", false);
  emits("delete:item", props.item.id);
};
</script>

<template>
  <div class="text-center pa-4">
    <v-dialog v-model="props.isActive" max-width="444" height="160" persistent>
      <v-card>
        <v-card-text class="d-flex justify-center align-center mx-3">
          <v-icon size="28" class="ms-3 me-2">mdi-delete</v-icon>
          <p style="font-size: 20px" class="me-4">
            Do you want to delete this user ?
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <!-- <v-card-text>
              <v-icon color="error">mdi-alpha-x</v-icon>Do you want to delete this user?
            </v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="emits('update:isActive', false)" color="success">
            cancel
          </v-btn>
          <v-btn @click="deleteUser" color="error">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
