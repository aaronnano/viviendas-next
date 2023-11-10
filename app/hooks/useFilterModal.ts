import { create } from 'zustand'

interface FilterModalStore {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void

    // rangeValues: number[]
    // ambientes: number
    // serviciosSeleceted: string[] 
    // onChangeRange: (values: number[]) => void
    // onChangeAmbientes: (value: number) => void
    // onChangeServicios: (values: string[]) => void
}

export const useFilterModal = create<FilterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    
    // rangeValues: [20,300],
    // ambientes: 1,
    // serviciosSeleceted: [],
    // onChangeRange: (values) => set({ rangeValues: values }),
    // onChangeAmbientes: (value) => set({ ambientes: value }),
    // onChangeServicios: (values) => set({ serviciosSeleceted: values }),
}))

