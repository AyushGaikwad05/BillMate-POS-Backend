const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, "All Fields Are Required!"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(createHttpError(401, "Invalid Credentials"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createHttpError(401, "Invalid Credentials"));
    }

    // ---------------------------------------------------
    // ⭐ CORRECT TOKEN CREATION
    // ---------------------------------------------------
    const accessToken = jwt.sign(
      { _id: user._id },
      config.accessTokenSecret,
      { expiresIn: "1d" }
    );

    // ---------------------------------------------------
    // ⭐ CORRECT COOKIE SETTING (your main issue)
    // ---------------------------------------------------
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.status(200).json({
      success: true,
      message: "User Login Successfully!",
      data: user
    });

  } catch (error) {
    next(error);
  }
};
