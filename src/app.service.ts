import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  getHello(): string {
    return `<body>
    <div id="container">
    <!-- zone de connexion -->
    
    <form action="users/login" method="POST">
        <h1>Connexion</h1>
        
        <label><b>Nom d'utilisateur</b></label>
        <input type="text" placeholder="Entrer le nom d'utilisateur" name="email" required>

        <label><b>Mot de passe</b></label>
        <input type="password" placeholder="Entrer le mot de passe" name="password" required>

        <input type="submit" id='submit' value='LOGIN' >
    </form>
</div>
</body>`;
  }
}
