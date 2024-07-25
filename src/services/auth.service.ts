import {ServiceResult} from "./service.result";
import axios, {AxiosError, AxiosRequestHeaders} from "axios";
import {IInfo, ISubscribeMessage, IUser} from "../models/user.model";
import {APIService} from "./api.service";
import { IChallengeRequest, IChallengeResponse } from "../models/challenge.model";

export class AuthService {

    static async ping(): Promise<ServiceResult<boolean>> {
        try {
            const res = await axios.get(`${APIService.baseURL}/subscribe`);
            if(res.status === 201) {
                return ServiceResult.success<boolean>(res.data);
            }
            return ServiceResult.failed();
        } catch(err) {
            if(err instanceof AxiosError && err.response?.status === 409) {
                return ServiceResult.conflict();
            }
            return ServiceResult.failed();
        }
    }

    static async subscribe(input: IUser): Promise<ServiceResult<ISubscribeMessage>> {
        try {
            const res = await axios.post(`${APIService.baseURL}/subscribe`, input);
            if(res.status === 201) {
                return ServiceResult.success<ISubscribeMessage>(res.data);
            }
            return ServiceResult.failed();
        } catch(err) {
            if(err instanceof AxiosError && err.response?.status === 409) {
                return ServiceResult.conflict();
            }
            return ServiceResult.failed();
        }
    }

    static async info(address: `0x${string}`) {
        try {
            const res = await axios.get(`${APIService.baseURL}/info/`+address);
            if(res.status === 201) {
                return ServiceResult.success<IInfo>(res.data);
            }
            return ServiceResult.failed();
        } catch(err) {
            if(err instanceof AxiosError && err.response?.status === 409) {
                return ServiceResult.conflict();
            }
            return ServiceResult.failed();
        }
    }

    static async hashChallenge(address: `0x${string}`): Promise<ServiceResult<IChallengeRequest>> {
        try {
            const res = await axios.get(`${APIService.baseURL}/challenge/hash/${address}`);
            if(res.status === 201) {
                return ServiceResult.success<IChallengeRequest>(res.data);
            }
            return ServiceResult.failed();
        } catch(err) {
            if(err instanceof AxiosError && err.response?.status === 404) {
                return ServiceResult.notFound();
            }
            return ServiceResult.failed();
        }
    }

    static async hashChallengeResponse(address: `0x${string}`, challenge: IChallengeResponse): Promise<ServiceResult<string>> {
        try {
            const res = await axios.post(`${APIService.baseURL}/challenge/hash/${address}/${challenge.ChallengeID}`, challenge);
            if(res.status === 200) {
                return ServiceResult.success<string>(res.data);
            }
            return ServiceResult.failed();
        } catch(err) {
            return ServiceResult.failed();
        }
    }

}
