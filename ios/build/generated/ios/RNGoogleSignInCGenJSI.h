/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleH.js
 */

#pragma once

#include <ReactCommon/TurboModule.h>
#include <react/bridging/Bridging.h>

namespace facebook::react {


  class JSI_EXPORT NativeGoogleSigninCxxSpecJSI : public TurboModule {
protected:
  NativeGoogleSigninCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker);

public:
  virtual jsi::Value signIn(jsi::Runtime &rt, jsi::Object params) = 0;
  virtual jsi::Value configure(jsi::Runtime &rt, jsi::Object params) = 0;
  virtual jsi::Value addScopes(jsi::Runtime &rt, jsi::Object params) = 0;
  virtual jsi::Value playServicesAvailable(jsi::Runtime &rt, bool showPlayServicesUpdateDialog) = 0;
  virtual jsi::Value signInSilently(jsi::Runtime &rt) = 0;
  virtual jsi::Value signOut(jsi::Runtime &rt) = 0;
  virtual jsi::Value revokeAccess(jsi::Runtime &rt) = 0;
  virtual jsi::Value clearCachedAccessToken(jsi::Runtime &rt, jsi::String tokenString) = 0;
  virtual bool hasPreviousSignIn(jsi::Runtime &rt) = 0;
  virtual std::optional<jsi::Object> getCurrentUser(jsi::Runtime &rt) = 0;
  virtual jsi::Value getTokens(jsi::Runtime &rt) = 0;
  virtual jsi::Object getConstants(jsi::Runtime &rt) = 0;

};

template <typename T>
class JSI_EXPORT NativeGoogleSigninCxxSpec : public TurboModule {
public:
  jsi::Value create(jsi::Runtime &rt, const jsi::PropNameID &propName) override {
    return delegate_.create(rt, propName);
  }

  std::vector<jsi::PropNameID> getPropertyNames(jsi::Runtime& runtime) override {
    return delegate_.getPropertyNames(runtime);
  }

  static constexpr std::string_view kModuleName = "RNGoogleSignin";

protected:
  NativeGoogleSigninCxxSpec(std::shared_ptr<CallInvoker> jsInvoker)
    : TurboModule(std::string{NativeGoogleSigninCxxSpec::kModuleName}, jsInvoker),
      delegate_(reinterpret_cast<T*>(this), jsInvoker) {}


private:
  class Delegate : public NativeGoogleSigninCxxSpecJSI {
  public:
    Delegate(T *instance, std::shared_ptr<CallInvoker> jsInvoker) :
      NativeGoogleSigninCxxSpecJSI(std::move(jsInvoker)), instance_(instance) {

    }

    jsi::Value signIn(jsi::Runtime &rt, jsi::Object params) override {
      static_assert(
          bridging::getParameterCount(&T::signIn) == 2,
          "Expected signIn(...) to have 2 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::signIn, jsInvoker_, instance_, std::move(params));
    }
    jsi::Value configure(jsi::Runtime &rt, jsi::Object params) override {
      static_assert(
          bridging::getParameterCount(&T::configure) == 2,
          "Expected configure(...) to have 2 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::configure, jsInvoker_, instance_, std::move(params));
    }
    jsi::Value addScopes(jsi::Runtime &rt, jsi::Object params) override {
      static_assert(
          bridging::getParameterCount(&T::addScopes) == 2,
          "Expected addScopes(...) to have 2 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::addScopes, jsInvoker_, instance_, std::move(params));
    }
    jsi::Value playServicesAvailable(jsi::Runtime &rt, bool showPlayServicesUpdateDialog) override {
      static_assert(
          bridging::getParameterCount(&T::playServicesAvailable) == 2,
          "Expected playServicesAvailable(...) to have 2 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::playServicesAvailable, jsInvoker_, instance_, std::move(showPlayServicesUpdateDialog));
    }
    jsi::Value signInSilently(jsi::Runtime &rt) override {
      static_assert(
          bridging::getParameterCount(&T::signInSilently) == 1,
          "Expected signInSilently(...) to have 1 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::signInSilently, jsInvoker_, instance_);
    }
    jsi::Value signOut(jsi::Runtime &rt) override {
      static_assert(
          bridging::getParameterCount(&T::signOut) == 1,
          "Expected signOut(...) to have 1 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::signOut, jsInvoker_, instance_);
    }
    jsi::Value revokeAccess(jsi::Runtime &rt) override {
      static_assert(
          bridging::getParameterCount(&T::revokeAccess) == 1,
          "Expected revokeAccess(...) to have 1 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::revokeAccess, jsInvoker_, instance_);
    }
    jsi::Value clearCachedAccessToken(jsi::Runtime &rt, jsi::String tokenString) override {
      static_assert(
          bridging::getParameterCount(&T::clearCachedAccessToken) == 2,
          "Expected clearCachedAccessToken(...) to have 2 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::clearCachedAccessToken, jsInvoker_, instance_, std::move(tokenString));
    }
    bool hasPreviousSignIn(jsi::Runtime &rt) override {
      static_assert(
          bridging::getParameterCount(&T::hasPreviousSignIn) == 1,
          "Expected hasPreviousSignIn(...) to have 1 parameters");

      return bridging::callFromJs<bool>(
          rt, &T::hasPreviousSignIn, jsInvoker_, instance_);
    }
    std::optional<jsi::Object> getCurrentUser(jsi::Runtime &rt) override {
      static_assert(
          bridging::getParameterCount(&T::getCurrentUser) == 1,
          "Expected getCurrentUser(...) to have 1 parameters");

      return bridging::callFromJs<std::optional<jsi::Object>>(
          rt, &T::getCurrentUser, jsInvoker_, instance_);
    }
    jsi::Value getTokens(jsi::Runtime &rt) override {
      static_assert(
          bridging::getParameterCount(&T::getTokens) == 1,
          "Expected getTokens(...) to have 1 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::getTokens, jsInvoker_, instance_);
    }
    jsi::Object getConstants(jsi::Runtime &rt) override {
      static_assert(
          bridging::getParameterCount(&T::getConstants) == 1,
          "Expected getConstants(...) to have 1 parameters");

      return bridging::callFromJs<jsi::Object>(
          rt, &T::getConstants, jsInvoker_, instance_);
    }

  private:
    friend class NativeGoogleSigninCxxSpec;
    T *instance_;
  };

  Delegate delegate_;
};

} // namespace facebook::react
