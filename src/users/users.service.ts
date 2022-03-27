import { Injectable, NotFoundException } from '@nestjs/common';
import { USERS } from './users.mock';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users : User[] = USERS;
  

  getUsers(): User[] {  

    /* 
    // User's data have been moved to users.mock file, This will seperate the provider and Data.
    // It keeps the code clean
    */

    const data = this.users;
        
    data.sort((c, d) => (c.lastName > d.lastName) ? 1 : -1)
    data.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1)
    return data;

  }

  /*
  // The test is only to return all users. 
  // But I have tried scaffolding the users module and implimented GET, PUT, POST and DELETE data types too
  // 
  */

  getUser(id: number): User {

    const user: User = this.users.find(user => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
    
  }

  
  create(user: User): User {
          
    // find the next id for a new user
    const maxId: number = Math.max(...this.users.map((user) => user.id), 0);
    const id: number = maxId + 1;
    
    const newUser: User = {
      ...user,
      id,
    };
    
    this.users.push(newUser);
    
    return newUser;
  }

  update(id: number, user: User): User {
    
    const index: number = this.users.findIndex((user) => user.id === id);
  
    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('User not found.');
    }
      
    const theUser: User = {
      ...user,
      id,
    };
  
    this.users[index] = theUser;
  
    return theUser;
  }

  delete(id: number): void {
    const index: number = this.users.findIndex(user => user.id === id);
  
    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('User not found.');      
    }
  
    this.users.splice(index, 1);
  }
}