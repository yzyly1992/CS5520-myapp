import { View, Text, FlatList, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import PressableButton from './PressableButton'

export default function GoalUsers() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function getUsers() {
            try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if(!response.ok) {
                throw new EvalError("HTTP error happened");
            }
            const arr = await response.json();
            
            setUsers(arr.map(x => x.name));
            // console.log(users);

            } catch (err) {
                console.log("get users error", err);
            }
        }
        getUsers();
    },[])

    async function addUser() {
        try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "Dave" }),
        });
        const res = await response.json();
        setUsers((prev) => {
            return [...prev, res.name];
        })
        console.log(res);
        }  catch (err) {
            console.log("post err", err);
        }
        
    }
    
    return (
        <View>
        <FlatList 
            data={users}
            renderItem={({item}) => {
                return (
                    <Text>{item}</Text>
                )
            }}
        />
        <Button onPress={addUser} title="Add me as a user" />
        </View>
    )
}