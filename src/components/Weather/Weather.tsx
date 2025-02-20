import {Graph} from "../Graph/Graph";
import React, {useEffect, useState} from "react";
import axios from "axios"
import styled, {css} from "styled-components";
import {theme} from "../../styles/theme";
import {FlexColumn, FlexRow, Input, Text1, Text3, TextValue} from "../../styles/components";
import {WindIcon} from "../Icons/assets/WindIcon";
import {HumidityIcon} from "../Icons/assets/HumidityIcon";
import {TempIcon} from "../Icons/assets/TempIcon";
import {PressureIcon} from "../Icons/assets/PressureIcon";
import {TempFeelsIcon} from "../Icons/assets/TempFeelsIcon";
import {convertDegreesToDirection} from "./utils";
import {CloudsIcon} from "../Icons/assets/CloudsIcon";
import {ArrowIcon} from "../Icons/assets/ArrowIcon";
import {LoaderIcon} from "../Icons/assets/LoaderIcon";
import {apiKey} from "../Main/Main";

export interface CityDataT {
    name: string,
    country: string
    local_names: {
        ru: string
        en: string
    }
    lat: number
    lon: number
}

export interface ForeCastInfoT {
    feels_like: number
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_kf: number
    temp_max: number
    temp_min: number
}

export interface WindInfoT {
    speed: number
    deg: number
    gust: number
}

export interface WeatherInfoT {
    main: string,
    description: string
}

export interface ForeCastT {
    dt: number,
    dt_text: string,
    main: ForeCastInfoT
    wind: WindInfoT
    weather: WeatherInfoT[]
    clouds: {
        all: number
    }
}

export interface WeatherDataT {
    city: {
        name: string
        country: string
    }
    list: ForeCastT[]
}

export type DisplayingDataT =
    "main.temp"
    | "main.humidity"
    | "main.pressure"
    | "main.feels_like"
    | "wind.speed"
    | "clouds.all"

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  overflow: hidden;
  border-radius: 20px;
  background: ${theme.colors.secondary};
  width: 100%;
`

const GraphWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
`

const WeatherItem = styled(FlexColumn)<{ active?: boolean, selected?: boolean }>`
  min-width: 100px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 16px;
  padding: 10px;
  cursor: pointer;
  transition: background-color .3s ease;
  ${({active = true, selected}) =>
          (active && !selected) && css`
            &:hover {
              background-color: ${theme.colors.secondary_hover};
            }
          `}

  ${({selected = false}) =>
          selected && css`
            background-color: ${theme.colors.secondary_hover_accent};
          `}
`

export const Weather = () => {
    const [weatherData, setWeatherData] = useState<WeatherDataT>()
    const [isLoading, setIsLoading] = useState(false)
    const [cityData, setCityData] = useState<CityDataT>()
    const [cityName, setCityName] = useState("")
    const [pointWeatherValue, setPointWeatherValue] = useState<ForeCastT | undefined>()
    const [displayingData, setDisplayingData] = useState<DisplayingDataT>("main.temp")
    const limit = 5
    const fetchCountryData = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get<CityDataT[]>(
                `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`);
            setCityData(response.data[0])
            setIsLoading(false)
        } catch (err: any) {
            console.log(err)
        }
    }

    const fetchWeatherData = async (lat: number, lon: number) => {
        setIsLoading(true)
        try {
            const response = await axios.get<WeatherDataT>(
                `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            setWeatherData(response.data)
            setIsLoading(false)
        } catch (err: any) {
            console.log(err)
        }
    }

    const formatDate = (unixTimestamp: number | undefined) => {
        if (!unixTimestamp) return ""
        const date = new Date(unixTimestamp * 1000);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        return `${formattedDate} ${formattedTime}`
    }


    useEffect(() => {
        if (!cityName) return
        const debounce = setTimeout(async () => {
            fetchCountryData()
        }, 500)

        return () => clearTimeout(debounce)
    }, [cityName]);

    useEffect(() => {
        if (!cityData) return
        fetchWeatherData(cityData?.lat, cityData?.lon)
        setDisplayingData("main.temp")
    }, [cityData]);

    return (
        <FlexColumn gap={10}>
            <FlexColumn gap={10}>
                <Text1>Weather App</Text1>
                <Input placeholder="Enter city name" value={cityName}
                       onChange={(e) => setCityName(e.target.value)}/>
            </FlexColumn>
            <CardWrapper>
                <FlexColumn gap={20}>
                    <FlexRow justify={"space-between"} align={"center"}>
                        <FlexRow gap={5}>
                            <Text1>{(cityData?.local_names?.ru || cityData?.local_names?.en ? cityData.local_names.ru ?? cityData.local_names.en : weatherData?.city.name) ?? "Enter a city"}</Text1>
                            <Text3>{cityData?.country}</Text3>
                        </FlexRow>
                        <TextValue>{formatDate(pointWeatherValue ? pointWeatherValue.dt : weatherData?.list[0].dt)}</TextValue>
                    </FlexRow>
                    <FlexRow justify="space-between" gap={10}>
                        <WeatherItem selected={displayingData === "main.temp"} onClick={() => {
                            setDisplayingData("main.temp")
                        }}><TempIcon
                            size={35}/><TextValue>{(pointWeatherValue ? pointWeatherValue.main.temp : weatherData?.list[0].main.temp)?.toFixed(1)} °C</TextValue></WeatherItem>
                        <WeatherItem selected={displayingData === "main.humidity"} onClick={() => {
                            setDisplayingData("main.humidity")
                        }}><HumidityIcon
                            size={35}/><TextValue>{pointWeatherValue ? pointWeatherValue.main.humidity : weatherData?.list[0].main.humidity} %</TextValue></WeatherItem>
                        <WeatherItem selected={displayingData === "main.feels_like"} onClick={() => {
                            setDisplayingData("main.feels_like")
                        }}><TempFeelsIcon
                            size={35}/><TextValue>{(pointWeatherValue ? pointWeatherValue.main.feels_like : weatherData?.list[0].main.feels_like)?.toFixed(1)} °C</TextValue></WeatherItem>
                        <WeatherItem selected={displayingData === "main.pressure"} onClick={() => {
                            setDisplayingData("main.pressure")
                        }}><PressureIcon
                            size={35}/><TextValue>{pointWeatherValue ? pointWeatherValue.main.pressure : weatherData?.list[0].main.pressure} hPa</TextValue></WeatherItem>
                        <WeatherItem selected={displayingData === "clouds.all"} onClick={() => {
                            setDisplayingData("clouds.all")
                        }}>
                            <CloudsIcon key={pointWeatherValue?.clouds.all + "cloud"} size={35}
                                        fillPercentage={(pointWeatherValue ? pointWeatherValue.clouds.all : weatherData?.list[0].clouds.all)}/>
                            <TextValue>{pointWeatherValue ? pointWeatherValue.clouds.all : weatherData?.list[0].clouds.all}%
                            </TextValue>
                        </WeatherItem>
                        <WeatherItem selected={displayingData === "wind.speed"} onClick={() => {
                            setDisplayingData("wind.speed")
                        }}>
                            <WindIcon size={35}/>
                            <TextValue>{pointWeatherValue ? pointWeatherValue.wind.speed : weatherData?.list[0].wind.speed} m/s</TextValue>
                        </WeatherItem>
                        <WeatherItem active={false}>
                            <ArrowIcon size={35} transition={"all .4s ease"}
                                       rotate={pointWeatherValue ? pointWeatherValue.wind.deg : weatherData?.list[0].wind.deg}/>
                            <TextValue>{convertDegreesToDirection(pointWeatherValue ? pointWeatherValue.wind.deg : weatherData?.list[0].wind.deg ?? 0)}</TextValue>
                        </WeatherItem>
                    </FlexRow>
                </FlexColumn>
            </CardWrapper>
            <CardWrapper>
                <GraphWrapper>
                    {!isLoading ? (
                        <Graph key={displayingData} data={weatherData?.list} displayedValue={displayingData}
                               getMouseValue={setPointWeatherValue}/>
                    ) : (
                        <LoaderIcon size={80}/>
                    )}
                </GraphWrapper>
            </CardWrapper>
        </FlexColumn>
    );
};
