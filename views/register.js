<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>register</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/css/styles.css">
    <body>
        <header>  
    
            <div class="menu-base">
            
                 <div class="botones">
                    <button type="submit" class="menu-arriba1"><a href="./home.html"><img width="70px" height="70px" src="/images/challa.jpeg" class="logo" alt="logo"> </a></button>
                    <button type="submit" class="menu-arriba"><a href="/"> MENU </a></button>     
                    <button type="submit" class="menu-arriba"><a href="/"> KOSHER WHAT? </a></button>  
                    <button type="submit" class="menu-arriba"><a href="/"> ABOUT US </a></button>  
                    <button type="submit" class="menu-arriba"><a href="/"> LOGIN </a></button> 
                    <button type="submit" class="menu-arriba"><a href="/"> PROFILE </a></button>
                    <button type="submit" class="menu-arriba1"><a href="/"><i class='fas fa-shopping-basket fa-2x'></i></button>
        
                </div>
                </div>
        
            </div>
        </div>
        </header>

        
        <main>
            <h4 class="title-login">Register</h4>


            <form action="/register" method="POST" class="form-all"> <div class="engloba-register">               

                <div class="form-control">
                    <label for="">Username</label>
                    <input type="text" name="fullname" required>
                </div>
                <div class="form-control">
                    <label for="">Email</label>
                    <input type="email" name="email" required>
                    <span><p>Ese nombre de usuario ya existe</p></span>
                </div>
                
                <div class="form-control">
                    <label for="">Avatar</label>
                    <input type="file" name="avatar" >
                </div>
                <div class="form-control">
                    <label for="">Password</label>
                    <input type="password" name="password" required>
                    <span><p>La contraseña debe contener al menos 8 caracteres, incluyendo una mayúscula</p></span>
                </div>
                <div class="form-control">
                    <label for="">Repet password</label>
                    <input type="password" name="repassword" required>
                    <span><p>Las contraseñas no coinciden</p></span>
                </div>

                <div class="button-register">
                    <div class="botonenviar"><button type="submit" class="enviar"><a href="/">Register</a> </button></div>
                    <div class="botonborrar"><button type="reset" class="borrar">Reset</button></div>
                </div>

                <div class="check-register">
                    <div class="checkbox-item"><input type="checkbox" name="Remember me" value="Remember me" id="Remember me" class="check">
                    <label for="remember">Remember me</label></div>

                    <div class="checkbox-item"><input type="checkbox" name="Sign up for our newslatter" value="Sign up for our newslatter" id="newslatter" class="check">
                    <label for="Sign up for our newslatter">Sign up for our newslatter</label></div>
                </div>

            </div>  
            </form>
    </main>


        <footer>
            <div class="footer-main">
                <div class="footer-top-box">
                    <h3>Social Media</h3>
                    <ul>
                    <p>Follow in: </p>
                        <a href="#"><i class="fab fa-facebook" aria-hidden="true"></i> Facebook</a>
                        <a href="#"><i class="fab fa-twitter" aria-hidden="true"></i> Twitter</a>
                        <a href="#"><i class="fab fa-instagram" aria-hidden="true"></i> Instagram</a>
                    </ul>
                </div>
            </div>
        
            <div class="footer-copyright">
                <p >Made with  <i class="fas fa-heart"></i> by DIGITAL HOUSE - Worldwide 2022 - All Rights Reserved.  </p>
            </div>
        </footer>

    </body>
</html>
