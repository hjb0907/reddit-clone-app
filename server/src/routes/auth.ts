import { Request, Response, Router } from "express";
import { User } from '../entities/User'
import { validate } from "class-validator";

const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    try {
        let errors: any = {};

        const eamilUser = await User.findOneBy({email});
        const usernameUser = await User.findOneBy({username});

        if (eamilUser) errors.email = '이미 해당 이메일 주소가 사용되었습니다.';
        if (usernameUser) errors.username = '이미 사용자 이름이 사용되었습니다.';

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }

        const user = new User();
        
        user.email = email;
        user.username = username;
        user.password = password;

        errors = await validate(user);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        await user.save();
        return res.json(user);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: '내부 서버 오류' });
    }
};

const router = Router();
router.post('/register', register);

export default router;
