Authentication flow:

App starts
   |
   v
SecureStore loads JWT
   |
   +-- No token ------------------> Welcome / Sign in / Register
   |
   +-- Token exists
          |
          v
        GET /me
          |
          +-- 200 ----------------> Home
          |
          +-- 401 ----------------> Clear token and show auth screens
