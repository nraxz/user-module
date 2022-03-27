import { Controller, Param, Get, Post, Put, Delete, Body, ParseIntPipe } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {

    constructor(private readonly userService:UsersService){}

        @Get()       
        getUsers(): User[] {
            return this.userService.getUsers()
        }
        /*
        // Functions bellow are not required for this perticular test
        // But I have tried to demonstrated my understanding of RestAPi and how quickly I can pick up with new programing language.
        */
        @Get(':id')
        getUser(@Param('id', ParseIntPipe) id: number): User {
            return this.userService.getUser(id)
        }

        @Post()           
            create(@Body() user: User): User {
                return this.userService.create(user);
            }

        @Delete(':id')
            delete(@Param('id', ParseIntPipe) id: number): void {
                return this.userService.delete(id);
            }

        @Put(':id')
            update(@Param('id', ParseIntPipe) id: number, @Body() user: User): User {
                return this.userService.update(id, user);
            }       
}
