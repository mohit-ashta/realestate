
import SmallLoader from "@/components/molecules/loader/loader";
import Modal from "react-modal";

interface deleteModalProps {
  isDelete: boolean;
  setIsDelete: (isDelete: boolean) => void;
  onClick: () => void;
  title?: string;
  isLoading?: boolean;
  className?: string;
  child?: JSX.Element;
}

export const ConfirmationModal: React.FC<deleteModalProps> = ({
  isDelete,
  setIsDelete,
  onClick,
  title,
  isLoading,
  className,
  child,
}) => {
  return (
    <div onClick={() => setIsDelete(false)}>
      <Modal className='absolute left-0 right-0 top-0  h-screen bottom-0 z-20 bg-black bg-opacity-20' isOpen={isDelete}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${className} shadow-1 overflow-hidden text-center rounded-lg  bg-white p-10 mx-auto mb-10 absolute left-1/2 right-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
          <span className='text-2xl font-semibold'>{title}</span>
          {child}
          <div className='flex items-center justify-center gap-7 mt-6'>
            <button
              type='button'
              className='bg-primary text-white font-semibold rounded-md px-4 py-2'
              onClick={() => setIsDelete(false)}
            >
              CANCEL_TXT
            </button>
            <button
              type='button'
              className='bg-primary text-white font-semibold rounded-md px-6 py-2'
              onClick={onClick}
            >
              {isLoading ? <SmallLoader /> : "OK"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
