// store.js
import {create} from 'zustand';

const useEmployeeStore = create((set) => ({
  employees: [], // Store employee data here
  setEmployees: (data) => set({ employees: data }),
}));

export default useEmployeeStore;
