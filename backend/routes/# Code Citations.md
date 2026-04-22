# Code Citations

## License: CC0_1_0
https://github.com/menaemg/xlarge/tree/ac21f2e4666a6516e57e2ecc566a94c65bf5e18b/app/Http/Controllers/api/v1/auth/AuthController.php

```
(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password
```


## License: unknown
https://github.com/trungtran1211/Booking-Api/tree/890017b30a915adb4cc1bc9c87a400e540f976c1/app/Http/Controllers/userController.php

```
:make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6
```


## License: unknown
https://github.com/zerpaerik/madreteresa_productos/tree/d76366133475c0cd12ba8d768573ec532af69933/app/Http/Controllers/UserController.php

```
all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);
        if (
```


## License: unknown
https://github.com/bimprakosoo/api-transaction-mongodb/tree/a7b39b41966811870db0942f697f984c06ada751/app/Http/Controllers/AuthController.php

```
required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response
```


## License: unknown
https://github.com/ariiyantto168/apiEkselens/tree/12e49a49a8585807fba6cf6fbad70fabc3b4cb17/app/Http/Controllers/AuthController.php

```
' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors
```

