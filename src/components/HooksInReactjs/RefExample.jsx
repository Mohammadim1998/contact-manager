import { useEffect } from "react";

const RefExample = () => {

    useEffect(() => {
        const person = {
            name: "Mohammad",
            lang: "persian",
            friends: {
                number: "book"
            }
        };

        console.log("person: ", person);
        console.log("*************************");

        let person_copy = { ...person };
        person_copy.lang = "english";
        person_copy.friends.number = "laptop"

        console.log("person: ", person.friends.number);
        console.log("person_copy: ", person_copy.friends.number);


    }, [])

    return (
        <div>
        </div> 
    );
}

export default RefExample;