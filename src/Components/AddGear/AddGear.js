import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const AddGear = () => {
    const { register, handleSubmit } = useForm();
    const [imageURL, setIMageURL] = useState(null);
    const history = useHistory();


    const onSubmit = data => {
        const gearData = {
            type: data.gearType,
            gearName: data.gearName,
            price: data.price,
            imgUrl: imageURL
        };
        if (imageURL) {
            fetch(`https://murmuring-journey-90422.herokuapp.com/addGear`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(gearData)
            })
                .then(res => history.push("/"))
        } else {
            alert('Please wait untill the image being uploaded.')
        }
    };

    const handleImageUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '537807002606c3b81736b3686577b200');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setIMageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <div className="container mt-3">
            <h3>Add Gear</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row lightgray-box p-2 mt-3">
                    <div className="mb-3 col-sm-12 col-lg-6">
                        <label htmlFor="gearName" className="form-label">Gear Name</label>
                        <input name="gearName" id="gearName" className="form-control" ref={register({ required: true })} />
                    </div>
                    <div className="mb-3 col-sm-12 col-lg-6">
                        <label htmlFor="gearType" className="form-label">Gear Type</label>
                        <input name="gearType" id="gearType" className="form-control" ref={register({ required: true })} />
                    </div>
                    <div className="mb-3 col-sm-12 col-lg-6">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input name="price" id="price" className="form-control" ref={register({ required: true })} />
                    </div>
                    <div className="mb-3 col-sm-12 col-lg-6">
                        <label htmlFor="gearImage" className="form-label">Add Gear Image</label>
                        <input name="gearImage" type="file" className="form-control" onChange={handleImageUpload} />
                    </div>
                </div>
                <div className="text-end mt-3">
                    <input type="submit" className="btn btn-warning" value="Save" />
                </div>
            </form>

        </div>
    );
};

export default AddGear;