import { View, StyleSheet, Image } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { buildHref } = useLinkBuilder();

  const icon = {
    index: (
      <Image
        source={{
          uri: "https://s3-alpha-sig.figma.com/img/e429/0bd6/5c5e4d1e337c0becdca77c70cdcf6717?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VvAC1~zbtfmwBm3GmWOsebkL~4q1-KTlDq0y3NmaZ1nbA0JnV5S~HNi202bDhJUu0oWXa0F4VF8lz6YtVWnLdZCa94~kde5S6G1Kct3u5w6ydCKJj2zqeRoLNfmAbT8Pdx7fqFBkQkCyFAuN~FJvda4PwnC8e1n9BsoR5Pb0YjkXpnUHuunCkLOCLUu396oPq9p-wmlI1LyotoX~AXXOSCL7vRFsSm2kxVI9-ybFoKvY-ZXAww0y5HRipc7MRL5T11jpTiAGEskhPM4Lbahje0IGeEDpNuGvbLbo2o0HOXvtk1B0i9zUV7CS5uWlYirFw7J-t8SsuycsBtdPglnCzw__",
        }}
        className="w-[35] h-[35]"
        resizeMode="contain"
      />
    ),
    home: (
      <Image
        source={{
          uri: "https://s3-alpha-sig.figma.com/img/5bf9/32ca/db319fb8d40ffeba1a80efebf44479d5?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LgB-gbiPhm-5IuBePGrYjAoKFH0My8JMXERkPZ-ttnmumvO~uhfh3WTwWwGcy6-v7tJLUNgFsuHBS4O-g28t4n4vlthRjTMg01NKsooeTbVBXWMbNWp9jBV1vPccXlMjIcG1~R54VDWb9QfAooc9gCWSH0kb12asF--Yqfk1m1xrj5~IxIFRElQ84vywZ91fMPCqSRp10veTwONXg22rjwrM6PT6bcyyAPIoLwZmKG6V6-TnGS5JU-3Oo28SFl984Glu1uaXvOi841O9HJFIxtHdKlFMB7wZcM9ohFy3V1tBlKDpUVNBslRIhogwm~ySuD1juMp~gaR-WA0csKK-8Q__",
        }}
        className="w-[35] h-[35]"
        resizeMode="contain"
      />
    ),
    seer: (
      <Image
        source={{
          uri: "https://s3-alpha-sig.figma.com/img/381e/f2e5/9a5f22eed38994325d2357e7a5533963?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gIdMCxmgo3V-HuT-X68UOcL3yUmxJ5zGnD-ZZjmk1zJ0lTWpAXHZyct7obXqGoJ9tcvszNqDIsVmhbCHQABC8MaTtQmtgNdUX6I7NglmU2RskrVbr3YIM8ZtZBhd1XLZ65UeROecImW9Tgv4k1aIhuyXlFl4c1VS6r6ZG8rr9z4R-3xujFSPzXrEANDFdlC8Aes-mRpAA0JAvRWVFhMS55m3fkEOs0ekgFVmHidIjAGUebZtF2oG4GK~lqmPJ4g6uSH-DEg5JgoZCnLOqpoVUj3gZJ2vxpit4ShIDIXx1rGXUaWIeRM0eKrCrsHnHGJk-cqifduRFLI9xvLg3dUhTQ__",
        }}
        className="w-[35] h-[35]"
        resizeMode="contain"
      />
    ),
  };

  return (
    <View className="items-center">
      <View style={styles.tabbar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // console.log(route.name);
          // if (["[name].tsx"].includes(route.name)) {
          //   return null;
          // }

          return (
            <PlatformPressable
              key={route.key}
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabbarItem}
            >
              <View
                className={
                  isFocused
                    ? "bg-[#6395EC] h-[55] w-[55] rounded-full items-center justify-center"
                    : ""
                }
              >
                {
                  // @ts-ignore
                  icon[route.name]
                }
              </View>
            </PlatformPressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1B003F",
    height: 74,
    width: 370,
    borderRadius: 74 / 2,
    borderCurve: "continuous",
  },
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
