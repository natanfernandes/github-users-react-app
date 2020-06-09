/**
 * método que retorna o avatar se o user for válido
 */
export function returnUserImageIfUserIsValid(user) {
  if (user && user.avatar) {
    return user.avatar;
  }
  if (user && user.avatar_url) {
    return user.avatar_url;
  }
  return null;
}

/**
 * método que retorna o nome se o user for válido
 */
export function returnUserNameIfUserIsValid(user) {
  if (user && user.name) {
    return user.name;
  }
  return null;
}

/**
 * método que retorna a bio se o user for válido
 */
export function returnUserBioIfUserIsValid(user) {
  if (user && user.bio) {
    return user.bio;
  }
  return null;
}

/**
 * método que retorna o login ou username se o user for válido
 */
export function returnUserLoginIfUserIsValid(user) {
  if (user && user.login) {
    return user.login;
  }
  return null;
}
/**
 * método que retorna o email se o user for válido
 */
export function returnEmailIfUserIsValid(user) {
  if (user && user.email) {
    return user.email;
  }
  return null;
}

/**
 * método que retorna o location se o user for válido
 */
export function returnLocationIfUserIsValid(user) {
  if (user && user.location) {
    return user.location;
  }
  return null;
}

/**
 * método que retorna a qtd de followers se o user for válido
 */
export function returnFollowersIfUserIsValid(user) {
  if (user && user.followers) {
    return user.followers;
  }
  return 0;
}

/**
 * método que retorna a qtd de following se o user for válido
 */
export function returnFollowingIfUserIsValid(user) {
  if (user && user.following) {
    return user.following;
  }
  return 0;
}
/**
 * método que retorna a qtd de public_repos se o user for válido
 */
export function returnQtdReposIfUserIsValid(user) {
  if (user && user.public_repos) {
    return user.public_repos;
  }
  return 0;
}
/**
 * método que retorna a qtd de gists se o user for válido
 */
export function returnQtdGistsIfUserIsValid(user) {
  if (user && user.public_gists) {
    return user.public_gists;
  }
  return 0;
}
/**
 * método que retorna a data q o user entrou se o user for válido
 */
export function returnCreatedAtIfUserIsValid(user) {
  if (user && user.created_at) {
    return user.created_at;
  }
  return null;
}
