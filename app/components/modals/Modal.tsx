'use client'

import { useCallback, useEffect, useState } from "react"

import { IoMdClose } from 'react-icons/io'
import { Button } from "../Button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: JSX.Element
  footer?: JSX.Element
  actionLabel?: string
  disabled?: boolean
  secAction?: () => void
  secLabel?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secAction,
  secLabel

}: any) => {

  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)    
  }, [isOpen])


  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose, disabled]);

  const handleSubmit = useCallback(async() => {
    if (disabled) {
      return;
    }

    await onSubmit();
  }, [onSubmit, disabled]);

  const handleSecAction = useCallback(() => {
    if (disabled || !secAction) {
      return;
    }

    secAction();
  }, [secAction, disabled]);

  if (!isOpen) {
    return null;
  }
  

  return (
    <>
      <div className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800/70
      ">
        <div className="
          relative
          w-full
          mx-auto

          md:w-3/6
          my-6
          h-full
          md:h-auto
        ">
          {/* Content */}
          <div className={`
            --translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : '-translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="
              relative
              translate
              h-full
              md:h-auto
              w-full
              border-0
              rounded-lg
              shadow-lg
              flex
              flex-col
              bg-white
              outline-none
              focus:outline-none
              
            ">
              {/* Header */}
              <div className="
                relative
                flex
                justify-center
                items-center
                rounded-t
                p-6
                border-b-[1px]
              ">
                <button
                  onClick={handleClose}
                  className="
                    absolute
                    border-0
                    hover:opacity-70
                    transition
                    p-1
                    left-7
                  "
                >
                  <IoMdClose size={18}/>
                </button>
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>
              
              {/*   BODY   */}
              <div className="relative py-6 flex-auto">
                {body}
              </div>
              
              {/*   FOOTER   */}
              <div className="flex flex-col gap-2 p-6">
                <div className="
                  flex
                  flex-row
                  items-center
                  gap-4
                  w-full
                ">
                  { secAction && secLabel && (
                    <Button
                      outline 
                      disabled={disabled}
                      label={secLabel}
                      onClick={handleSecAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
