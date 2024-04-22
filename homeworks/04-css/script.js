      function calculateSettingAsThemeString({
        localStorageTheme,
        systemSettingDark,
      }) {
        if (localStorageTheme !== null) {
          return localStorageTheme;
        }

        if (systemSettingDark.matches) {
          return "dark";
        }

        return "light";
      }

      function updateThemeOnHtmlEl({ theme }) {
        document.querySelector("html").setAttribute("data-theme", theme);
      }

      function setPathColor(theme) {
        const themePath = document.querySelector("path");
        const themeBgPath = document.querySelectorAll("path")[1];
        const icons = Array.from(document.getElementsByClassName("profile-container__details__icons-icon"));
        if (theme === "dark") {
          themePath.setAttribute("fill", "#171F26");
          themeBgPath.setAttribute("fill", "#A3ABB2")
          icons.forEach(icon => {
            icon.setAttribute("fill", "#A3ABB2");
        });
        } else {
          themePath.setAttribute("fill", "white");
          themeBgPath.setAttribute("fill", "#3D3D3D")
          icons.forEach(icon => {
            icon.setAttribute("fill", "#3D3D3D");
          })
        }
      }

      const btnTheme = document.getElementsByClassName("header__theme-button")[0];
      const localStorageTheme = localStorage.getItem("theme");
      const systemSettingDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
    
      let currentThemeSetting = calculateSettingAsThemeString({
        localStorageTheme,
        systemSettingDark,
      });
      updateThemeOnHtmlEl({ theme: currentThemeSetting });
      setPathColor(currentThemeSetting);
      btnTheme.addEventListener("click", (event) => {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

        localStorage.setItem("theme", newTheme);
        updateThemeOnHtmlEl({ theme: newTheme });

        currentThemeSetting = newTheme;
        setPathColor(currentThemeSetting);
      });
