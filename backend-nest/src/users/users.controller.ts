import { Controller, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Delete('me')
    async deleteAccount(@Request() req) {
        // req.user is hydrated by JwtAuthGuard with { id, email }
        return this.usersService.deleteUserAccount(req.user.id);
    }
}
