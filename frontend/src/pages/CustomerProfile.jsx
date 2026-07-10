import { useEffect, useState } from "react";
import axios from "axios";

function CustomerProfile() {

    const customerId = localStorage.getItem("customerId");

    const [profile, setProfile] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const response = await axios.get(
                `http://127.0.0.1:8000/api/accounts/customer/${customerId}/`
            );

            setProfile(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load profile");

        }

    };

    const updateProfile = async () => {

        try {

            await axios.put(
                `http://127.0.0.1:8000/api/accounts/customer/update/${customerId}/`,
                profile
            );

            alert("Profile Updated Successfully");

        } catch (error) {

            console.log(error);

            alert("Unable to update profile");

        }

    };

    return (

        <div
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "20px"
            }}
        >

            <h1>Customer Profile</h1>

            <input
                type="text"
                placeholder="Full Name"
                value={profile.full_name}
                onChange={(e) =>
                    setProfile({
                        ...profile,
                        full_name: e.target.value
                    })
                }
            />

            <br /><br />

            <input
                type="email"
                placeholder="Email"
                value={profile.email}
                readOnly
            />

            <br /><br />

            <input
                type="text"
                placeholder="Phone"
                value={profile.phone}
                onChange={(e) =>
                    setProfile({
                        ...profile,
                        phone: e.target.value
                    })
                }
            />

            <br /><br />

            <textarea
                placeholder="Address"
                value={profile.address}
                onChange={(e) =>
                    setProfile({
                        ...profile,
                        address: e.target.value
                    })
                }
            />

            <br /><br />

            <button onClick={updateProfile}>
                Update Profile
            </button>

        </div>

    );

}

export default CustomerProfile;