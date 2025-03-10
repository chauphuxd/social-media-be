import User from "~/models/schemas/User.shema";
import databaseService from "./database.services";
import { RegisterReqBody } from "~/models/User.requests";
import { hashPassword } from "~/utils/crypto";
import { signToken } from "~/utils/jwt";
import { TokenType } from "~/constants/enum";
import ms from "ms";



class UsersService {
    private signAccessToken(user_id: string) {
        return signToken({
            payload: {
                user_id,
                token_type: TokenType.AccessToken
            },
            options: {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as ms.StringValue
            }
        });
    }

    private signRefreshToken(user_id: string) {
        return signToken({
            payload: {
                user_id,
                token_type: TokenType.RefreshToken
            },
            options: {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue
            }
        })
    }

    async register(payload: RegisterReqBody) {
        const result = await databaseService.users.insertOne(new User({
            ...payload,
            date_of_birth: new Date(payload.day_of_birth),
            password: hashPassword(payload.password)
        }))
        const user_id = result.insertedId.toString()
        const [access_token, refresh_token] = await Promise.all([
            this.signAccessToken(user_id),
            this.signRefreshToken(user_id)
        ])
        return {
            access_token,
            refresh_token
        }
    }

    async checkEmailExits(email: string) {
        const user = await databaseService.users.findOne({ email })
        return Boolean(user)
    }
}

const usersService = new UsersService();
export default usersService;