import React, { useState } from 'react';
import axios from 'axios';
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




function Login(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function onSubmit() {

		const data = {
			"username" : username,
			"password" : password
    	};
		axios.post('http://127.0.0.1:8000/rest-auth/login/', data).then(function (response) {
			localStorage.setItem('token', response.data.token);
		}).then(onClose).then(props.reload);
	}




	return (
		<>
	      <Button style={{float: 'right', display: props.authenticated ? 'none' : 'block'}} onClick={onOpen}>Login</Button>

	      <Modal
	        initialFocusRef={initialRef}
	        isOpen={isOpen}
	        onClose={onClose}
	      >
	        <ModalOverlay />
	        <ModalContent>
	          <ModalHeader>Login to your account</ModalHeader>
	          <ModalCloseButton />
	          <ModalBody pb={6}>
	            <FormControl isRequired>
	              <FormLabel>Username</FormLabel>
	              <Input
				  	ref={initialRef}
					placeholder="Username"
					onChange={(e)=>setUsername(e.target.value)}
					/>
	            </FormControl>

	            <FormControl mt={4} isRequired>
	              <FormLabel>Password</FormLabel>
	              <Input
				  	placeholder="Password"
					onChange={(e)=>setPassword(e.target.value)}
					/>
	            </FormControl>
	          </ModalBody>

	          <ModalFooter>
	            <Button onClick={onSubmit} variantColor="blue" mr={3}>
	            	Submit
	            </Button>
	            <Button onClick={onClose}>Cancel</Button>
	          </ModalFooter>
	        </ModalContent>
	      </Modal>
	    </>
	);
}


export default Login;
