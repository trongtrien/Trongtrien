import * as React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import useMediaQuery from '../../utils/isMobile';

export default function CustomSeparator({chapterLabel, lesonLabel,partLabel, link}) {
  const chapterLink = `/Course/${link}`
  const ismobile = useMediaQuery('500')
  const breadcrumbs = [
    <Link
      underline="none"
      key="1"
      href="/Course"
    >
      {ismobile?'Eps':'Eps-Topik'}
    </Link>,
    <Link key="2"
          underline="none"
          href={chapterLink}
    >
      {chapterLabel}
    </Link>,
    <Typography key="3" style={{color: "#123"}}>
      {lesonLabel}<span>{partLabel}</span>
  </Typography>
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}