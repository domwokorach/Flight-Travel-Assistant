import React from 'react'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import ApartmentIcon from '@mui/icons-material/Apartment'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import LuggageIcon from '@mui/icons-material/Luggage'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import WifiIcon from '@mui/icons-material/Wifi'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull'
import PlaceIcon from '@mui/icons-material/Place'

const icons = {
  terminal: ApartmentIcon,
  checkin: WorkOutlineIcon,
  security: VerifiedUserIcon,
  passport: FaceRetouchingNaturalIcon,
  lounge: LocalCafeIcon,
  shop: ShoppingBagIcon,
  food: RestaurantIcon,
  baggage: LuggageIcon,
  lost: HelpOutlineIcon,
  wifi: WifiIcon,
  charge: BatteryChargingFullIcon,
}

export default function AirportServiceCard({ title, detail, icon }) {
  const Icon = icons[icon] || PlaceIcon
  return (
    <Card sx={{ p: 2.5 }}>
      <Stack direction="row" spacing={1.5}>
        <Box sx={{ width: 40, height: 40, borderRadius: 3, bgcolor: 'action.hover', color: 'text.secondary', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <Icon fontSize="small" />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: 14 }}>{title}</Typography>
          <Typography sx={{ mt: 0.5, fontSize: 12, fontWeight: 600, lineHeight: 1.6, color: 'text.secondary' }}>{detail}</Typography>
        </Box>
      </Stack>
    </Card>
  )
}
