import {AuthService} from "../../services/auth.service";
import {ServiceErrorCode} from "../../services/service.result";
import {ChangeEvent, useState} from "react";
import './Subscribe.css';
import {useNavigate} from "react-router-dom";
import { ISubscribeMessage, IUser } from "../../models/user.model";
import {ethers} from "ethers"
import crypto from "crypto-js"
import randomBytes from "randombytes";

function generateAddress(): `0x${string}` {
    var id = randomBytes(32).toString('hex');
    var privateKey = "0x" + id;
    var wallet = new ethers.Wallet(privateKey);
    return wallet.address as `0x${string}`
}

function Subscribe() {
    const [sub, setSub] = useState<IUser>({
        Name: '',
        Address: generateAddress()
    });
    const [errorMessage, setErrorMessage] = useState<string>();
    const navigate = useNavigate();

    const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        setSub((old) => {
            old.Name = text;
            return old;
        });
    }

    const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value as `0x${string}`;
        setSub((old) => {
            old.Address = text;
            return old;
        });
    }

    const handleSubscribe = async () => {
        const result = await AuthService.subscribe(sub);
        if (result.errorCode === ServiceErrorCode.success) {
            localStorage.setItem("address", sub.Address)
            navigate('/info');
            return;
        }
        if(result.errorCode === ServiceErrorCode.conflict) {
            setErrorMessage('Name already exists');
            return;
        }
        setErrorMessage('Internal server error');
    };

    return (
        <div>
            <h1>Subscribe</h1>
            <input type="text" placeholder='Name' onChange={handleLoginChange} />
            <input type="text" placeholder='Address' onChange={handleAddressChange} />
            {
                errorMessage &&
                <p id="subscribe-error-message">{errorMessage}</p>
            }
            <button onClick={handleSubscribe}>Subscribe</button>
        </div>
    )
}

export default Subscribe;
