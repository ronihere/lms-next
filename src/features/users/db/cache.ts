import { revalidateTag } from "next/cache";

export function getGlobalUserTag() {
    return getGlobalTag('user');
}

export function getUserSpecificTag(userId: string) {

    const userTag = getIdTag('user', userId);
    console.log({ userTag })
    return userTag;
}

// revalidates all user cache , should be called after any changes in Users table
export function revalidateUserCache(userId: string) {
    revalidateTag(getGlobalUserTag());
    revalidateTag(getUserSpecificTag(userId));
}

function getGlobalTag(type: 'user' | 'product') {
    return `global-${type}` as const;
}
function getIdTag(type: 'user' | 'product', id: string) {
    return `${type}-${id}` as const;
}