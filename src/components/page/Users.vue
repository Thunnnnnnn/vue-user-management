<script setup>
import { ref, computed } from "vue";
import addUserDialog from "/src/components/dialog/addUserDialog.vue";
import EditUserDialog from "/src/components/dialog/editUserDialog.vue";
import DeleteUserDialog from "/src/components/dialog/deleteUserDialog.vue";
import { useUsersStore } from "/src/stores/usersStore";

const headers = ref([
  { title: "ID", value: "id", width: "10%" },
  { title: "First Name", value: "name", width: "20%" },
  { title: "Last Name", value: "lastName", width: "20%" },
  { title: "Phone number", value: "phoneNumber", width: "20%" },
  { title: "Email", value: "email", width: "20%" },
  { title: "", value: "actions", sortable: false, minWidth: "100px" },
]);
const users = useUsersStore();
const search = ref("");
const user = ref({
  id: '',
  name: "",
  lastName: "",
  email: "",
  password: "",
});
const isActive = ref(false);
const isDeleteActive = ref(false);

const editItem = (item) => {
  user.value = item;
  isActive.value = true;
};

const deleteItem = (item) => {
  isDeleteActive.value = true;
  user.value = item;
};

const updateUser = (item) => {
  users.updateUser(item);
};

const deleteUser = (index) => {
  users.deleteUser(index);
};

const filteredUsers = computed(() => {
  if (!search.value) {
    return users.users;
  }
  return users.users.filter((user) =>
    user.id.toString().includes(search.value)
  );
});
</script>

<template>
  <v-row>
    <v-col cols="12">
      <div
        style="width: 100%; background-color: #90e7fa; height: 100px"
        class="d-flex justify-center align-center elevation-3"
      >
        <v-img
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          max-width="50px"
          class="mr-2"
        ></v-img>
        <h1 class="display-1">Users Management</h1>
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card elevation="0" border title="">
              <template v-slot:title>
                <v-row class="d-flex justify-start align-center pa-0">
                    <v-col cols="12" lg="3" md="4"><p style="font-size: 28px;" class="ms-3">USERS DATA</p></v-col>
                  <v-col cols="12" lg="5" md="6" class="mt-3">
                    <v-text-field v-model="search" placeholder="Search ID" append-inner-icon="mdi-magnify" variant="outlined" class="ms-3"></v-text-field>
                  </v-col>
                </v-row>
                
              </template>  
              <template v-slot:append>
                <addUserDialog />
              </template>
              <v-divider></v-divider>
              <v-data-table :items="filteredUsers" :headers="headers" height="500px">
                <template v-slot:item.actions="{ item }">
                  <div class="d-flex">
                  <v-icon
                    @click="editItem(item)"
                    size="24"
                    style="color: grey"
                    class="me-2"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    @click="deleteItem(item)"
                    size="24"
                    style="color: grey"
                  >
                    mdi-delete
                  </v-icon>
                </div>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>

  <EditUserDialog
    :isActive="isActive"
    @update:isActive="(e) => (isActive = e)"
    :item="user"
    @update:item="(e) => updateUser(e)"
  />
  <DeleteUserDialog
    :isActive="isDeleteActive"
    @update:isActive="(e) => (isDeleteActive = e)"
    :item="user"
    @delete:item="(e) =>deleteUser(e)"
  />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
