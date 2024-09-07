/* eslint-disable */
export default async () => {
    const t = {
        ["./users/users.model"]: await import("./users/users.model"),
        ["./auth/dto/login-response.dto"]: await import("./auth/dto/login-response.dto"),
        ["./coupons/coupons.model"]: await import("./coupons/coupons.model"),
        ["./orders/dto/create-order.dto"]: await import("./orders/dto/create-order.dto"),
        ["./products/products.model"]: await import("./products/products.model")
    };
    return { "@nestjs/swagger": { "models": [[import("./users/dto/user.dto"), { "UserDto": { id: { required: true, type: () => String }, email: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, role: { required: false, type: () => String }, status: { required: false, type: () => String } } }], [import("./users/dto/create-user.dto"), { "CreateUserDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 6 }, irstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, role: { required: false, type: () => String }, status: { required: false, type: () => String } } }], [import("./users/dto/update-user.dto"), { "UpdateUserDto": { email: { required: false, type: () => String }, password: { required: false, type: () => String, minLength: 6 }, firstName: { required: false, type: () => String }, lastName: { required: false, type: () => String }, role: { required: false, type: () => String }, status: { required: true, type: () => String } } }], [import("./auth/dto/auth-email-login.dto"), { "AuthEmailLoginDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String } } }], [import("./auth/dto/auth-register-login.dto"), { "AuthRegisterLoginDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 6 }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String } } }], [import("./auth/dto/login-response.dto"), { "LoginResponseDto": { token: { required: true, type: () => String }, tokenExpires: { required: true, type: () => Number } } }], [import("./orders/dto/place-order.dto"), { "PlaceOrderDto": { orderId: { required: true, type: () => String }, discountCode: { required: true, type: () => String } } }], [import("./orders/dto/add-item.dto"), { "AddItemDto": { itemId: { required: true, type: () => String }, quantity: { required: true, type: () => Number }, orderId: { required: false, type: () => String }, userId: { required: false, type: () => String } } }], [import("./orders/dto/create-order.dto"), { "CreateOrderDto": { orderId: { required: true, type: () => String } } }], [import("./coupons/dto/create-coupon.dto"), { "CreateCouponDto": { couponCode: { required: true, type: () => String }, discountPercent: { required: true, type: () => Number }, expiration: { required: true, type: () => Date }, nthOrderValidity: { required: true, type: () => Number } } }], [import("./coupons/dto/valid-coupon.dto"), { "ValidCouponDto": { discountAmount: { required: true, type: () => Number }, isValid: { required: true, type: () => Boolean } } }]], "controllers": [[import("./users/users.controller"), { "UsersController": { "create": { type: t["./users/users.model"].User }, "findAll": { type: [t["./users/users.model"].User] }, "findOne": { type: t["./users/users.model"].User }, "update": { type: t["./users/users.model"].User }, "remove": { type: Boolean } } }], [import("./auth/auth.controller"), { "AuthController": { "login": { type: t["./auth/dto/login-response.dto"].LoginResponseDto }, "register": { type: t["./auth/dto/login-response.dto"].LoginResponseDto } } }], [import("./coupons/coupons.controller"), { "CouponsController": { "createCoupon": { type: t["./coupons/coupons.model"].Coupon }, "validateCoupon": {} } }], [import("./orders/orders.controller"), { "OrdersController": { "addItemToCart": { type: t["./orders/dto/create-order.dto"].CreateOrderDto }, "checkout": { type: t["./orders/dto/create-order.dto"].CreateOrderDto } } }], [import("./products/products.controller"), { "ProductsController": { "getAllProducts": { type: [t["./products/products.model"].Product] }, "getProductById": { type: t["./products/products.model"].Product }, "createProduct": { type: t["./products/products.model"].Product } } }]] } };
};