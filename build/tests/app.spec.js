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
const app_1 = __importDefault(require("../app"));
const SharpFunction_1 = __importDefault(require("../SharpFunction"));
const fs_1 = __importDefault(require("fs"));
const request = (0, supertest_1.default)(app_1.default);
describe('Test endpoint responses', () => {
    it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=fjord&width=50&height=dfsdf');
        expect(response.status).toBe(404);
    })),
        it('gets the api endpoint with Image', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/assets/fjord.jpg');
            expect(response.status).toBe(200);
        })),
        it('gets the api endpoint with fail height -1', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/api/images?filename=download&width=50&height=-1');
            expect(response.status).toBe(404);
        })),
        it('gets the api endpoin with fack url', () => __awaiter(void 0, void 0, void 0, function* () {
            (0, SharpFunction_1.default)('download.png', 300, 300);
            expectAsync(fs_1.default.readFileSync(process.cwd() + "/assets/thumbnail/filename=download&width=300&height=300.png")).toBeResolvedTo;
        }));
});
