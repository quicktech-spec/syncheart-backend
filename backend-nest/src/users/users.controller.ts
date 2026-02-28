import { Controller, Delete, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('me')
    async getProfile(@Request() req) {
        return this.usersService.getProfile(req.user.id);
    }

    @Get('me/relationship')
    async getRelationship(@Request() req) {
        return this.usersService.getRelationship(req.user.id);
    }

    @Post('sync-couple')
    async syncCouple(@Request() req, @Body() body: { invite_code: string }) {
        return this.usersService.syncCouple(req.user.id, body.invite_code);
    }

    // Send an E2E encrypted message
    @Post('messages')
    async sendMessage(@Request() req, @Body() body: { relationship_id: string; ciphertext: string; iv: string; auth_tag: string }) {
        return this.usersService.sendMessage(req.user.id, body.relationship_id, body.ciphertext, body.iv, body.auth_tag);
    }

    // Get encrypted messages for a relationship
    @Get('messages/:relationship_id')
    async getMessages(@Request() req, @Param('relationship_id') relId: string) {
        return this.usersService.getMessages(req.user.id, relId);
    }

    @Delete('me')
    async deleteAccount(@Request() req) {
        return this.usersService.deleteUserAccount(req.user.id);
    }
}
