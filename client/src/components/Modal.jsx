import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import EditProfileModal from './EditProfileModal'

const Modal = ({ user }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false)
  };

  function openModal() {
    setIsOpen(true)
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="button py-3 cursor-pointer"
      >
        Update
      </button>
   
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 overflow-y-auto" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center pt-20 p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-y-auto max-h-[90vh]
                rounded-2xl bg-white p-6 py-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Edit profile
                  </Dialog.Title>
                  
                  <div className="mt-2">
                    <EditProfileModal user={user} onClose={closeModal} />
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
};

export default Modal;
