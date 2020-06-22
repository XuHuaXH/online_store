import React from 'react';
import { SimpleGrid, Box, Flex, Button, Input, useDisclosure } from "@chakra-ui/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/core";




function Register() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef();
	const finalRef = React.useRef();
	return (
		<>
	      <Button style={{float: 'right'}} onClick={onOpen}>Register</Button>

	      <Modal
	        initialFocusRef={initialRef}
	        isOpen={isOpen}
	        onClose={onClose}
	      >
	        <ModalOverlay />
	        <ModalContent>
	          <ModalHeader>Create a new account</ModalHeader>
	          <ModalCloseButton />
	          <ModalBody pb={6}>
	            <FormControl isRequired>
	              <FormLabel>Username</FormLabel>
	              <Input ref={initialRef} placeholder="Username" />
	            </FormControl>

	            <FormControl mt={4} isRequired>
	              <FormLabel>Password</FormLabel>
	              <Input placeholder="Password" />
	            </FormControl>

				<FormControl mt={4} isRequired>
	              <FormLabel>Confirm Password</FormLabel>
	              <Input placeholder="Enter your password again" />
	            </FormControl>

				<FormControl mt={4} isRequired>
	              <FormLabel>Email</FormLabel>
	              <Input placeholder="Email" />
	            </FormControl>
	          </ModalBody>

	          <ModalFooter>
	            <Button variantColor="blue" mr={3}>
	            	Submit
	            </Button>
	            <Button onClick={onClose}>Cancel</Button>
	          </ModalFooter>
	        </ModalContent>
	      </Modal>
	    </>
	);
}


export default Register;
