"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const request = (0, supertest_1.default)(app_1.app);
describe('Test endpoint responses', () => {
    it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&width=50&height=dfsdf');
        expect(response.status).toBe(200);
    })),
        it('gets the api endpoint with Image', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/assets/fjord.jpg');
            expect(response.status).toBe(200);
        })),
        it('gets the api endpoint with fail Image', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=sdhf jksd&width=50&height=dfsdf');
            expect(response.status).toBe(200);
        })),
        it('gets the api endpoin with fack url', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/aplksdj f/lsjkdf kl');
            expect(response.status).toBe(200);
        }));
});
it('test get full name file', () => __awaiter(void 0, void 0, void 0, function* () {
    yield expectAsync((0, app_1.getFullNameFile)('sjkdhfuisf')).toBeRejected();
}));
