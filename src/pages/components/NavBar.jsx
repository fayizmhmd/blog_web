import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog, getBlogs } from "../../redux/slices/blogSlice";
import { toast } from "sonner";


const NavBar = () => {

  const [isOpen, onOpenChange] = useState(false)

  const dispatch = useDispatch()

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Blog web
          </span>
          <Button color="primary" variant="shadow" onClick={()=> onOpenChange(true)}>Add Blog</Button>
        </div>
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Blog</ModalHeader>
              <ModalBody>
                <form id="add-blog" className="flex flex-col gap-2" 
                onSubmit={async(e)=>{
                  e.preventDefault();

                  const title = e.target.title.value
                  const description = e.target.description.value
                  const author = e.target.author.value

                  onOpenChange(false)
                  try {
                    await dispatch(createBlog({
                      title:title,
                      description:description,
                      author:author
                    })).unwrap()
  
                    await dispatch(getBlogs())
  
                    toast.success('Blog added succesfully')
                  } catch (error) {
                    toast.error(error.message)
                  }

                  // console.log({title,description,author})
                }}
                >
                <Input label="Title" bordered name="title" />
                <Input label="Description" bordered name="description" />
                <Input label="Author" bordered name="author" />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type='submit' form='add-blog'>
                  Add Blog
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </nav>
    </div>
  );
};

export default NavBar;
