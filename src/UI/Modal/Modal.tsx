import type { ModalProps } from "../../interfaces/main"

export default function Modal({ isOpen, onClose, children }: ModalProps) {

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]">
      <div className="bg-neutral-900 text-white rounded-2xl p-6 max-w-lg w-full shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors text-xl"
        >
          &times;
        </button>

        <div>{children}</div>
      </div>
    </div>
  )
}