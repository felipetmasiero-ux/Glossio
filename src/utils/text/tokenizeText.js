const TOKEN_PATTERN = /[\p{L}\p{N}'’]+|[^\s\p{L}\p{N}]+|\s+/gu;

export function tokenizeText(text) {

    return text.match(TOKEN_PATTERN) ?? [];

}
