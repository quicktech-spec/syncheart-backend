import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    deleteAccount(req: any): Promise<{
        message: string;
    }>;
}
