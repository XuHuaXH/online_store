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




function Register(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef();
	const finalRef = React.useRef();
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');

    function onSubmit() {
		const data = {
			"username" : username,
			"password1" : password1,
            "password2" : password2,
            "email" : email
    	};
		axios.post('http://127.0.0.1:8000/rest-auth/registration/', data).then(function (response) {
			localStorage.setItem('token', response.data.token);
            console.log(response.data.token);
		}).then(onClose).then(props.reload);
	}


	return (
		<>
	      <Button style={{float: 'right', display: props.authenticated ? 'none' : 'block'}} onClick={onOpen}>Register</Button>

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
                    onChange={(e)=>setPassword1(e.target.value)}
                    />
	            </FormControl>

				<FormControl mt={4} isRequired>
	              <FormLabel>Confirm Password</FormLabel>
	              <Input
                    placeholder="Enter your password again"
                    onChange={(e)=>setPassword2(e.target.value)}
                    />
	            </FormControl>

				<FormControl mt={4} isRequired>
	              <FormLabel>Email</FormLabel>
	              <Input
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    />
	            </FormControl>
	          </ModalBody>

	          <ModalFooter>
	            <Button
                    onClick={onSubmit}
                    variantColor="blue"
                    mr={3}
                >
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
