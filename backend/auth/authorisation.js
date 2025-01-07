function isAuthenticated(request, response, next) {
  if (!request.isAuthenticated()) {
    return response.status(401).json({ message: "Not authenticated" });
  }
  next();
}
export { isAuthenticated };
