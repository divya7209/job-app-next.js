/** @format */

import { TextEncoder, TextDecoder } from "util";
import "@testing-library/jest-dom";
import "jest-fetch-mock";

// Add TextEncoder polyfill
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;