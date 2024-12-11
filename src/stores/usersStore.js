import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useUsersStore = defineStore('users', () => {
    // โหลดข้อมูลจาก LocalStorage หรือกำหนดค่าเริ่มต้น
    const users = ref(JSON.parse(localStorage.getItem('users') || '[]'));
    const id = ref(JSON.parse(localStorage.getItem('userId') || '1'));
  
    const addUser = (user) => {
      users.value.push({ ...user, id: `A${id.value.toString().padStart(3, '0')}` });
      id.value++;
    };
  
    const deleteUser = (index) => {
      users.value.splice(index, 1);
    };
  
    const updateUser = (item) => {
      users.value[item.index] = { ...item };
    };
  
    // ใช้ watch เพื่อติดตามและบันทึกข้อมูลลง LocalStorage
    watch(users, (newUsers) => {
      localStorage.setItem('users', JSON.stringify(newUsers));
    }, { deep: true });
  
    watch(id, (newId) => {
      localStorage.setItem('userId', JSON.stringify(newId));
    });
  
    return { users, addUser, deleteUser, updateUser };
  });