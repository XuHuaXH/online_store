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




function AddressEditor(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
    const address = props.address;

	const initialRef = React.useRef();
	const finalRef = React.useRef();
    const [streetNumber, setStreetNumber] = useState(address.street_number);
    const [streetName, setStreetName] = useState(address.street_name);
	const [city, setCity] = useState(address.city);
	const [state, setState] = useState(address.state);
	const [zipcode, setZipcode] = useState(address.zipcode);


    function onSave() {
		const data = {
            "id": address.id,
			"street_number" : streetNumber,
			"street_name" : streetName,
            "city" : city,
            "state" : state,
			"zipcode" : zipcode,
    	};
		const token = localStorage.getItem('token');
		const header = {
			headers: {
      			Authorization: "JWT " + token
   			}
		};
        console.log(data);
        console.log(header);
		axios.put('http://127.0.0.1:8000/address/', data, header).then(function (response) {
            console.log(response.data);
		}).then(onClose).then(props.reload);

	}


	return (
		<>
	      <Button variantColor="teal" size="md" style={{float: 'left'}} onClick={onOpen}>Edit</Button>

	      <Modal
	        initialFocusRef={initialRef}
	        isOpen={isOpen}
	        onClose={onClose}
	      >
	        <ModalOverlay />
	        <ModalContent>
	          <ModalHeader>Create a new address</ModalHeader>
	          <ModalCloseButton />
	          <ModalBody pb={6}>
	            <FormControl isRequired>
	              <FormLabel>Street Number</FormLabel>
	              <Input
                    defaultValue={address.street_number}
                    ref={initialRef}
                    onChange={(e)=>setStreetNumber(e.target.value)}
                    />
	            </FormControl>

	            <FormControl mt={4} isRequired>
	              <FormLabel>Street Name</FormLabel>
	              <Input
                    defaultValue={address.street_name}
                    onChange={(e)=>setStreetName(e.target.value)}
                    />
	            </FormControl>

				<FormControl mt={4} isRequired>
	              <FormLabel>City</FormLabel>
	              <Input
                    defaultValue={address.city}
                    onChange={(e)=>setCity(e.target.value)}
                    />
	            </FormControl>

				<FormControl mt={4} isRequired>
	              <FormLabel>State</FormLabel>
	              <Input
                    defaultValue={address.state}
                    onChange={(e)=>setState(e.target.value)}
                    />
	            </FormControl>
				<FormControl mt={4} isRequired>
	              <FormLabel>Zipcode</FormLabel>
	              <Input
                    defaultValue={address.zipcode}
                    onChange={(e)=>setZipcode(e.target.value)}
                    />
	            </FormControl>
	          </ModalBody>

	          <ModalFooter>
	            <Button
                    onClick={onSave}
                    variantColor="blue"
                    mr={3}
                >
	            	Save
	            </Button>
	            <Button onClick={onClose}>Cancel</Button>
	          </ModalFooter>
	        </ModalContent>
	      </Modal>
	    </>
	);
}


export default AddressEditor;
